import { Label } from "@radix-ui/react-label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import GoogleIcon from "./icons/GoogleIcon"
import { Link } from "react-router-dom"
import type { FormEvent } from "react"

type AuthData = {
    name?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    contactName?: string;
    phone?: string;
    email: string;
    password: string;
    address?: string;
};

const AuthCard = ({ cardTitle, cardDescription, type, role, onSubmit }: {
    cardTitle: string;
    cardDescription: string;
    type: "register" | "login";
    role: "food-partner" | "user";
    onSubmit: (data: AuthData) => void;
}) => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget as HTMLFormElement);

        const data: AuthData = {
            email: form.get("email") as string,
            password: form.get("password") as string
        };

        // If it's user register, add full name
        if (role === "user" && type === "register") {
            const firstName = form.get("firstName") as string;
            const lastName = form.get("lastName") as string;
            if (firstName && lastName) {
                data.fullName = `${firstName} ${lastName}`;
            }
        }

        // If it's food-partner register, add business info
        if (role === "food-partner" && type === "register") {
            const name = form.get("name") as string;
            const address = form.get("address") as string;
            const phone = form.get("phone") as string;
            const contactName = form.get("contactName") as string;
            if (name) data.name = name;
            if (address) data.address = address;
            if (phone) data.phone = phone;
            if (contactName) data.contactName = contactName;
        }

        onSubmit(data);
    }

    return (
        <div>
            <Card className="w-full max-w-sm sm:w-sm">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>{cardTitle}</CardTitle>
                        <CardDescription>
                            {cardDescription}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-3 pt-4">
                            {(role == "food-partner" && type == "register") &&
                                <div className="grid gap-1.5 text-xs w-full">
                                    <Label htmlFor="name">Business Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Restaurant XYZ"
                                        required
                                    />
                                </div>
                            }
                            {type == "register" &&
                                <div className="grid gap-1.5 text-xs">
                                    <div className="flex gap-2">
                                        <div className="flex flex-col gap-1.5">
                                            <Label>{role == "user" ? "First Name" : "Contact Name"}</Label>
                                            <Input
                                                id={role == "user" ? "firstName" : "contactName"}
                                                name={role == "user" ? "firstName" : "contactName"}
                                                type="text"
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="email">{role == "user" ? "Last Name" : "Phone"}</Label>
                                            {
                                                role == "user" ?
                                                    <Input
                                                        id="lastName"
                                                        type="text"
                                                        name="lastName"
                                                        placeholder="Doe"
                                                        required
                                                    />
                                                    :
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        inputMode="numeric"
                                                        placeholder="123 456 7890"
                                                        required
                                                        onInput={(e) => {
                                                            // keep only digits
                                                            let value = e.currentTarget.value.replace(/\D/g, "");
                                                            // format as 123 456 7890
                                                            if (value.length > 3 && value.length <= 6) {
                                                                value = `${value.slice(0, 3)} ${value.slice(3)}`;
                                                            } else if (value.length > 6) {
                                                                value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 10)}`;
                                                            }
                                                            e.currentTarget.value = value;
                                                        }}
                                                    />
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="grid gap-1.5 text-xs w-full">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={role == "user" ? "johndoe@example.com" : "resturantxyz@email.com"}
                                    required
                                />
                            </div>
                            <div className="grid gap-1.5 text-xs">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            {(role == "food-partner" && type == "register") &&
                                <div className="grid gap-1.5 text-xs">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" name="address" type="text" placeholder="123 Main Street" required />
                                </div>
                            }
                        </div>

                    </CardContent>
                    <CardFooter className="flex-col gap-2 pt-4">
                        <Button type="submit" className="w-full">
                            {type === "login" ? "Login" : "Register"}
                        </Button>
                        <Button variant="outline" className="w-full flex items-center">
                            <span><GoogleIcon /></span>Login with Google
                        </Button>
                        <CardDescription className="pt-2">
                            {type == "login" ?
                                <p>
                                    Don’t have an account? <Link to={`/${role}/register`} className="text-accent-foreground underline">Register</Link>
                                </p>
                                :
                                <p>
                                    Already have an account? <Link to={`/${role}/login`} className="text-accent-foreground underline">Login</Link>
                                </p>
                            }
                        </CardDescription>
                    </CardFooter>
                </form>
            </Card>
        </div >
    )
}

export default AuthCard