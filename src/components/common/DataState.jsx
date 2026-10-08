import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/common/EmptyState";
import { ListShimmer } from "@/components/common/Shimmer";

/**
 * Wrap any API-driven section so loading / error / empty are always handled:
 *
 * <DataState loading={loading} error={error} isEmpty={!items.length} onRetry={refetch}>
 *   ...render items...
 * </DataState>
 */
export default function DataState({
  loading,
  error,
  isEmpty,
  onRetry,
  filtered = false,
  loader = <ListShimmer />,
  empty,
  children,
}) {
  if (loading) return loader;

  if (error) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Something went wrong"
        description={typeof error === "string" ? error : "We could not load the data."}
        action={
          onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              Try again
            </Button>
          )
        }
      />
    );
  }

  if (isEmpty) return empty || <EmptyState filtered={filtered} />;

  return children;
}
