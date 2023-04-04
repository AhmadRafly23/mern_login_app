import React, { useEffect, useState } from 'react';
import styles from '../styles/Username.module.css';
import { toast, Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { generateOTP, verifyOTP } from '../helper/helper';

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((res) => {
      if (res) {
        return toast.success('OTP has been send to your email!');
      }
      return toast.error('Problem while generating OTP!');
    });
  }, [username]);

  const resendOTP = () => {
    const sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: 'Sending...',
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sentPromise.then((res) => {
      return;
    });
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();

    try {
      const { status } = await verifyOTP({ username, code: otp });
      if (status === 201) {
        toast.success('Verify Successfully!');
        return navigate('/reset');
      }
      return toast.error('Wront OTP! Check email again!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20">
            <div className="textbox flex flex-col items-center gap-6">
              <span className="py-4 text-sm text-left text-gray-500">
                Enter 6 digit OTP sent to your email address.
              </span>
              <input
                className={styles.textbox}
                type="text"
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className={styles.btn}
                type="submit"
                onClick={handleSubmitOTP}
              >
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP?{' '}
                <button
                  className="text-red-500"
                  type="button"
                  onClick={resendOTP}
                >
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
