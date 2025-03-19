"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LogoutPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-50">
      <div className="bg-white p-12 rounded-lg w-96">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl text-black font-bold text-center">Are you sure you want to logout?</h2>
        </div>
        <div className="flex justify-center space-x-10">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
