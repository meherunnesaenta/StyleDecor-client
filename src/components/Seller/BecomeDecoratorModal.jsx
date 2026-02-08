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
    if (!user) {
      toast.error('User not authenticated.');
      return;
    }

    if (!phone || !experience) {
      toast.error('Phone number and experience are required!');
      return;
    }

    // Phone validation (Bangladesh format)
    const phoneRegex = /^(\+8801[3-9]\d{8})$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Please enter a valid Bangladesh phone number (e.g., +8801XXXXXXXXX).');
      return;
    }

    // Experience validation
    const expNum = Number(experience);
    if (isNaN(expNum) || expNum < 0 || expNum > 50) {
      toast.error('Experience must be a number between 0 and 50 years.');
      return;
    }

    // Portfolio validation (if provided)
    if (portfolio && !portfolio.match(/^https?:\/\/.+/)) {
      toast.error('Please enter a valid URL for portfolio.');
      return;
    }

    setLoading(true);

    try {
      const res = await axiosSecure.post('/become-decorator', {
        name: user.displayName || 'Guest',
        phone,
        experience: expNum,
        portfolio: portfolio.trim() || '',
      });

      if (res.data.success) {
        toast.success('Application submitted successfully! Admin will review it soon.');
        // Reset form
        setPhone('');
        setExperience('');
        setPortfolio('');
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
                disabled={loading}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+8801XXXXXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100"
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
                disabled={loading}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio Link (Optional)
              </label>
              <input
                type="url"
                disabled={loading}
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100"
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
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-70"
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