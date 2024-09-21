import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, X } from 'lucide-react'

type Props = {
  showPopup: boolean,
  setShowPopup: (showPopup: boolean) => void,
  errMessage: string| null
}

export default function CreatePopup({showPopup, setShowPopup, errMessage}: Props) {
  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
    <DialogContent className='bg-white'>
      <DialogHeader>
        <DialogTitle className='text-gray-700'>{
        errMessage? "There Was a problem with creating the apartment": 
        "Apartment Created Successfully"
        }</DialogTitle>
        <DialogDescription>
          {errMessage ? errMessage : 'Your new apartment listing has been added to the system.'}
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-center my-4">
        <div className={`rounded-full ${errMessage? 'bg-red-100': 'bg-green-100'} p-3`}>
          {
            errMessage ? <X className="h-8 w-8 text-red-600" /> : 
            <Check className="h-8 w-8 text-green-600" />
          }
        </div>
      </div>
      <DialogFooter className="sm:justify-start">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.location.href = '/apartments'}
        >
          View Apartments
        </Button>
        <Button
          className='text-gray-700'
          type="button"
          variant="outline"
          onClick={() => setShowPopup(false)}
        >
          Create Another
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
