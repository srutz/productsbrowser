/* eslint-disable react-refresh/only-export-components */
import { atom, useAtom, useSetAtom } from "jotai"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const confirmState = atom({
    message: "",
    onSuccess: () => { }
})

export function useConfirm() {
    const setState = useSetAtom(confirmState);    
    return (message: string, onSuccess: () => void) => {
        setState({ message: message, onSuccess: onSuccess })
    }
}

export function ConfirmDialog() {
    const [ state, setState ] = useAtom(confirmState);
    const { message, onSuccess} = state
    return (
    <Dialog open={!!message} onOpenChange={() => {
        setState({
            message: "",
            onSuccess: () => {}
        })
    }}>
        <DialogContent className="sm:max-w-sm">
            <DialogHeader>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription>
                {message}
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" onClick={() => {
                setState({
                    message: "",
                    onSuccess: () => {}
                });
                onSuccess()
            }}>Accept action</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}
