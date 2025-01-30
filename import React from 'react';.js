import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";

const UserProfilePage = () => {
  const user = {
    name: "Szegedi Dávid",
    email: "szegedi.david@example.com",
    joinedDate: "2023-01-01",
    bio: "Software developer with a passion for creating innovative solutions.",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-2xl shadow-xl">
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Member since: {user.joinedDate}</p>
              <p className="mt-2">{user.bio}</p>
            </div>
            <div className="mt-6 text-right">
              <Button className="flex items-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;
