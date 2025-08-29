import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

export type User = {
    id: string,
    firstName?: string,
    lastName?: string,
    lastSignInAt: number,
    emailAddresses: {id: number, emailAddress: string, [key: string]: any;}[],
    [key: string]: any,
}

export function UsersTable({ data }:{ data: User[] }) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Seen</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                data.map((user) =>(
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src='/globe.svg' alt={`${user.firstName} ${user.lastName}`}></AvatarImage>
                                    <AvatarFallback>
                                        {
                                            user.firstName ? user.firstName[0] : ""
                                        }
                                    </AvatarFallback>
                                </Avatar>
                                {user.firstName} {user.lastName}
                            </div>
                        </TableCell>
                        <TableCell>{user.emailAddresses[0].emailAddress}</TableCell>
                        <TableCell>{new Date(user.lastSignInAt).toLocaleString("en-GB", { timeZone: "UTC" })}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
  )
}