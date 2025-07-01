import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Logo } from "@/components/logo"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo size="xl" showText={true} className="justify-center mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Authentication Error</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            There was a problem with the authentication process
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Authentication Failed
            </CardTitle>
            <CardDescription>We encountered an issue while trying to sign you in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                The authentication code was invalid or has expired. This can happen if:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>The link was already used</li>
                  <li>The link has expired</li>
                  <li>There was a network error</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Link href="/auth/signin">
                <Button className="w-full bg-lime-600 hover:bg-lime-700">Try Signing In Again</Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
