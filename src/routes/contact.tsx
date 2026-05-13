import { Button } from '@/components/ui/button';
import { useConfirm } from '@/ui/ConfirmDialog';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
  errorComponent: (e) => <div>Error has arrived {e.error?.toString()}</div>
})

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const confirm = useConfirm();
  const handleClick = () => {
    confirm("Are you sure you want to delete this item?", () => {
      console.log("CONFIRMED")
    })
  }
  return (
    <div>
      <Button variant="default" onClick={handleClick}>Toggle</Button>
    </div>
  )
}
