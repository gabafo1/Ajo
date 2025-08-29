import { getUserList, setRole, removeRole, getInvitations } from '../actions'
import { SendInviteForm } from './SendInviteForm';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { UpdateRoleForm } from './UpdateRoleForm';
import { DeleteInviteBtn } from './DeleteInviteBtn';




export default async function Page() {
  const users = await getUserList().then((response) => response.data);
  const invitations = await getInvitations().then((response) => response.data);
  console.log(invitations);
  return (
    <div className="w-full space-y-10 p-6 md:p-8 lg:p-10">
      {/* Members Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage roles of existing members. As an admin, you can add, edit, or delete users.
          </p>
          <SendInviteForm />
        </div>
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {users.map((user, index) => (
              <div key={user.id}>
                <li className="flex flex-col space-y-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4 transition-shadow hover:shadow-sm">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.imageUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UpdateRoleForm
                      role={user.publicMetadata?.role as string || "user"}
                      setRoleAction={setRole}
                      userId={user.id}
                    />
                    <form
                      action={async () => {
                        "use server";
                        const formData = new FormData();
                        formData.append("id", user.id);
                        await removeRole(formData);
                      }}
                    >
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 />
                      </Button>
                    </form>
                  </div>
                </li>
                {index !== users.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </ul>
        </div>
      </div>

      {/* Pending Invites Section */}
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Pending Invites</h3>
          <p className="text-sm text-muted-foreground">
            Invited users who haven't accepted their invitation yet.
          </p>
        </div>
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {invitations.map((invitation) => (
              <li
                key={invitation.id}
                className="flex flex-col space-y-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4 transition-shadow hover:shadow-sm"
              >
                <div>
                  <p className="font-medium text-foreground">{invitation.emailAddress}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <DeleteInviteBtn
                    InvitationId={invitation.id}
                    emailAddress={invitation.emailAddress}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}