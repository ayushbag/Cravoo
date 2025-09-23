import { Label } from "@radix-ui/react-label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import GoogleIcon from "./icons/GoogleIcon"

const AuthCard = ({ cardTitle, cardDescription }: {
    cardTitle: string;
    cardDescription: string;
}) => {
    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardDescription>
                        {cardDescription}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-3">
                            <div className="grid gap-1.5 text-xs">
                                <Label htmlFor="email">Full Name</Label>
                                <div className="flex flex-1 gap-2">
                                    <Input
                                        id="first name"
                                        type="text"
                                        placeholder="John"
                                        required
                                    />
                                    <Input
                                        id="last one"
                                        type="text"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-1.5 text-xs">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-1.5 text-xs">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <Button variant="outline" className="w-full flex items-center">
                        <span><GoogleIcon /></span>Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AuthCard