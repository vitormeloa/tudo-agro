import Test403Redirect from '@/components/Test403Redirect'
import Example403Usage from '@/components/Example403Usage'

export default function Test403Page() {
  return (
    <div className="space-y-8">
      <Example403Usage />
      <Test403Redirect />
    </div>
  )
}