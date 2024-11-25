import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function UserProfile({
  firstName = "",
  lastName = "",
  contactOne = "",
  joiningDate = "",
  vehicleName,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  const getInitials = (name) => name.charAt(0).toUpperCase();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${firstName}%20${lastName}`}
            alt={`${firstName} ${lastName}`}
          />
          <AvatarFallback>
            {getInitials(firstName)}
            {getInitials(lastName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl">
            {firstName} {lastName}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {joiningDate
              ? `Member since ${formatDate(joiningDate)}`
              : "Joining date not available"}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">First Name</Label>
            <p className="text-sm text-muted-foreground">
              {firstName || "Not provided"}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium">Last Name</Label>
            <p className="text-sm text-muted-foreground">
              {lastName || "Not provided"}
            </p>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium">Contact</Label>
          <p className="text-sm text-muted-foreground">
            {contactOne || "Not provided"}
          </p>
        </div>
        <div>
          <Label className="text-sm font-medium">Joining Date</Label>
          <p className="text-sm text-muted-foreground">
            {joiningDate ? formatDate(joiningDate) : "Not provided"}
          </p>
        </div>
        {vehicleName && (
          <div>
            <Label className="text-sm font-medium">Vehicle</Label>
            <p className="text-sm text-muted-foreground">{vehicleName}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
