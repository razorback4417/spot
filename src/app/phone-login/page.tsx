'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebaseConfig';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [step, setStep] = useState('phone');
  const [error, setError] = useState('');
  const router = useRouter();

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
    }
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(number);
  };

  const handleSendCode = async () => {
    setError('');
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number with country code (e.g., +1234567890)');
      return;
    }

    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setStep('code');
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      setError(error.message || 'Failed to send verification code. Please try again.');
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const result = await signInWithCredential(auth, credential);
      if (result.user) {
        router.push('/home');
      }
    } catch (error: any) {
      console.error('Error verifying code:', error);
      setError(error.message || 'Failed to verify code. Please try again.');
    }
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          {step === 'phone' ? 'Enter Your Phone Number' : 'Enter Verification Code'}
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {step === 'phone' ? (
          <>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number (e.g., +1234567890)"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <button
              onClick={handleSendCode}
              className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
            >
              Send Code
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verification Code"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <button
              onClick={handleVerifyCode}
              className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
            >
              Verify
            </button>
          </>
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}