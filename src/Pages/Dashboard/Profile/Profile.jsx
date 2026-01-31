import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.init'; 
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const { user, updateUserProfile } = useAuth(); 
  const { role, roleLoading } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || '');
  const [newPhoto, setNewPhoto] = useState(null);

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleUpdateProfile = async () => {
    let photoURL = user?.photoURL;

    if (newPhoto) {
      const formData = new FormData();
      formData.append('image', newPhoto);

      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          formData
        );
        photoURL = res.data.data.url;
      } catch (err) {
        toast.error('Photo upload failed');
        return;
      }
    }

    updateUserProfile({
      displayName: newName,
      photoURL: photoURL
    })
      .then(() => {
        toast.success('Profile updated successfully!');
        setIsModalOpen(false);
      })
      .catch(err => {
        toast.error('Update failed: ' + err.message);
      });
  };

  const handleChangePassword = () => {
    if (!user?.email) {
      toast.error('Email not found');
      return;
    }

    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        toast.success('Password reset email sent! Check your inbox.');
      })
      .catch(err => {
        toast.error('Failed: ' + err.message);
      });
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-base-200 px-4'>
      <div className='bg-base-100 shadow-2xl rounded-2xl  max-w-4xl p-8'>
        <div className='flex flex-col items-center'>
          <img
            alt='profile'
            src={user?.photoURL || 'https://i.ibb.co/0s7Y5Zn/user-placeholder.jpg'}
            className='mx-auto object-cover rounded-full h-32 w-32 border-4 border-primary shadow-lg'
          />

          <div className="badge badge-primary badge-lg mt-6">
            <span className="text-sm font-semibold capitalize">{role || 'User'}</span>
          </div>

          <p className='mt-4 text-xl font-bold text-primary'>
            User ID: {user?.uid?.substring(0, 10)}...
          </p>

          <div className='w-full p-6 mt-6 bg-base-200 rounded-xl'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8'>
              <div>
                <p className="text-sm text-base-content/60">Name</p>
                <p className='text-lg font-bold text-primary'>{user?.displayName || 'N/A'}</p>
              </div>
              <div >
                <p className="text-sm text-base-content/60 ">Email</p>
                <p className='text-lg font-bold text-primary'>{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-base-content/60">Role</p>
                <p className='text-lg font-bold text-secondary capitalize'>{role || 'user'}</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className='btn btn-primary'
              >
                Update Profile
              </button>
              <button 
                onClick={handleChangePassword}
                className='btn btn-secondary'
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Profile</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPhoto(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button onClick={handleUpdateProfile} className="btn btn-primary">
                Save Changes
              </button>
              <button onClick={() => setIsModalOpen(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;