"use client";

import { useState } from "react";
import { ArrowLeft, PencilLine, Plus, Trash2, Undo2 } from "lucide-react";
import { DiscardChangesModal } from "@/components/common";
import { Button } from "@/components/ui";
import AddProjectPanel from "@/components/projects/AddProjectPanel";
import ProjectsTabs from "@/components/projects/ProjectsTabs";
import SubmitRequirementsModal from "@/components/projects/SubmitRequirementsModal";
import ProjectsTable from "@/components/projects/list/ProjectsTable";
import { PROJECT_STEPS } from "@/constants/projects";
import { useProjectForm } from "@/hooks/useProjectForm";
import { useProjectsStore } from "@/hooks/useProjectsStore";
import { useToast } from "@/context/ToastContext";

const FIRST_STEP = PROJECT_STEPS[0].id;

/**
 * Projects page. List mode: All / Approved / Submitted for review / Drafts tabs with an
 * "Add project" button. Add mode: the step-by-step form (unchanged).
 * Stays mounted (see TabContent) so form data survives tab switches.
 */
export default function ProjectsView() {
  const form = useProjectForm();
  const store = useProjectsStore();
  const toast = useToast();

  const [mode, setMode] = useState("list"); // "list" | "add"
  const [tab, setTab] = useState("all");
  const [stepId, setStepId] = useState(FIRST_STEP);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const showError = (err, fallback) => toast.error(err?.message || fallback);

  const startFresh = () => {
    form.reset();
    setEditingId(null);
    setStepId(FIRST_STEP);
  };

  /** Save the current form with the given status, then show the matching list. */
  const persist = async (status, nextTab, successMessage) => {
    setSaving(true);
    try {
      await store.save({ id: editingId, status, values: form.values });
      startFresh();
      setTab(nextTab);
      setMode("list");
      toast.success(successMessage);
    } catch (err) {
      showError(err, "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = () => {
    if (!form.values.name.trim()) {
      toast.error("Add a project name before saving a draft.");
      setStepId(FIRST_STEP);
      return;
    }
    persist("draft", "drafts", "Draft saved. You can continue it any time from Drafts.");
  };

  const handleSubmit = () => {
    const missing = form.readiness.required.some((item) => !item.done);
    if (missing) {
      setRequirementsOpen(true);
      return;
    }
    persist("review", "review", "Project submitted. The KeyBayt team will review it shortly.");
  };

  const handleEdit = (project) => {
    form.load(project.values);
    setEditingId(project.id);
    setStepId(FIRST_STEP);
    setMode("add");
  };

  const handleMoveToDraft = async (project) => {
    try {
      await store.setStatus(project.id, "draft");
      toast.success("Moved back to Drafts.");
    } catch (err) {
      showError(err, "Could not move the project.");
    }
  };

  const confirmDelete = async () => {
    try {
      await store.remove(toDelete.id);
      if (toDelete.id === editingId) startFresh();
      toast.success("Draft deleted.");
    } catch (err) {
      showError(err, "Could not delete the draft.");
    } finally {
      setToDelete(null);
    }
  };

  const projectsByTab = {
    all: store.all,
    approved: store.approved,
    review: store.reviews,
    drafts: store.drafts,
  };

  /** Row buttons depend on the project's status (sample projects are read-only). */
  const renderActions = (project) => {
    if (project.sample) return null;
    if (project.status === "draft") {
      return (
        <>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Delete draft"
            onClick={() => setToDelete(project)}
            className="text-danger hover:bg-danger-light"
          >
            <Trash2 size={15} />
          </Button>
          <Button size="sm" leftIcon={PencilLine} onClick={() => handleEdit(project)}>
            Continue
          </Button>
        </>
      );
    }
    if (project.status === "review") {
      return (
        <Button variant="outline" size="sm" leftIcon={Undo2} onClick={() => handleMoveToDraft(project)}>
          Move to drafts
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto flex w-full max-w-[1680px] flex-1 flex-col gap-5">
      {mode === "list" ? (
        <>
          <ProjectsTabs
            value={tab}
            onChange={setTab}
            counts={{
              all: store.all.length,
              approved: store.approved.length,
              review: store.reviews.length,
              drafts: store.drafts.length,
            }}
            action={
              <Button leftIcon={Plus} onClick={() => setMode("add")}>
                Add project
              </Button>
            }
          />

          <ProjectsTable
            tabId={tab}
            projects={projectsByTab[tab]}
            loading={store.loading}
            error={store.error}
            onRetry={store.refresh}
            onAdd={() => setMode("add")}
            renderActions={renderActions}
          />
        </>
      ) : (
        <>
          <div>
            <Button variant="ghost" size="sm" leftIcon={ArrowLeft} onClick={() => setMode("list")}>
              Back to projects
            </Button>
          </div>

          <AddProjectPanel
            form={form}
            stepId={stepId}
            onStepChange={setStepId}
            editing={Boolean(editingId)}
            saving={saving}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        </>
      )}

      <SubmitRequirementsModal
        open={requirementsOpen}
        items={form.readiness.required}
        onClose={() => setRequirementsOpen(false)}
      />
      <DiscardChangesModal
        open={Boolean(toDelete)}
        title="Delete this draft?"
        message={"This draft will be removed permanently.\nThis cannot be undone."}
        discardLabel="Delete"
        keepLabel="Keep"
        onDiscard={confirmDelete}
        onKeep={() => setToDelete(null)}
      />
    </div>
  );
}
