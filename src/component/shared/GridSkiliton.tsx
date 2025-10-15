import { Skeleton } from "@/components/ui/skeleton"

export function GridSkiliton() {
  return (
    <div className="bg-red-500 flex flex-col space-y-3">
      <Skeleton className="bg-red-500 h-[125px] w-[250px] rounded-xl" />
      <div className="bg-red-500 space-y-2">
        <Skeleton className="bg-red-500 h-4 w-[250px]" />
        <Skeleton className="bg-red-500 h-4 w-[200px]" />
      </div>
    </div>
  )
}
