import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const BecomeDecoratorModal = ({ isOpen, closeModal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const handleSubmit = async () => {
    if (!phone || !experience) {
      toast.error('Phone number and experience are required!');
      return;
    }

    setLoading(true);

    try {
      const res = await axiosSecure.post('/become-decorator', {
        email: user.email,
        name: user.displayName || 'Guest',
        phone,
        experience: Number(experience),
        portfolio: portfolio.trim() || '',
      });

      if (res.data.success) {
        toast.success('Application submitted successfully! Admin will review it soon.');
        closeModal();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl backdrop-blur-xl 
                     duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle as="h3" className="text-2xl font-bold text-center text-gray-900 mb-6">
            Become a Decorator
          </DialogTitle>

          <div className="text-center mb-8">
            <p className="text-gray-600 leading-relaxed">
              Join our talented team of interior decorators! Share your expertise and help clients create beautiful spaces.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Your application will be reviewed by admin within 24-48 hours.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+8801XXXXXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio Link (Optional)
              </label>
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Share your Behance, Instagram, or personal website
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={closeModal}
              disabled={loading}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BecomeDecoratorModal;