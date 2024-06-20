import { getUserAddress } from "@/lib/utils";
import { UserHomeForm } from "./_components/user-home-form";
import { UserSettingsForm } from "./_components/user-settings-form";
import { getSession } from "@/lib/auth";
import { APIResponse, HomeAdressResponse } from "@/types/req-res-types";

const UserSettingsPage = async () => {
  const session = await getSession();
  const userId = await session?.user?.id;
  const address = await getUserAddress(Number(userId));
  return (
    <div className="grid w-full items-start gap-6 justify-items-stretch md:grid-cols-2 md:col-span-4 lg:grid-cols-2 lg:col-span-4">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">User Details</legend>
        <UserSettingsForm user={session?.user} />
      </fieldset>
      <fieldset className="grid gap-6 rounded-lg border p-4 md:col-span-1">
        <legend className="-ml-1 px-1 text-sm font-medium">
          User Home Address
        </legend>
        <UserHomeForm
          userId={session?.user.id}
          userAddress={address?.address}
        />
      </fieldset>
    </div>
  );
};

export default UserSettingsPage;
