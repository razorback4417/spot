//phone-login/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth } from '../firebase/firebaseConfig';
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult
} from 'firebase/auth';
import countryCodes from '../utils/countryCodes';

interface CountryCodeDropdownProps {
    selectedCountry: string;
    onSelect: (code: string) => void;
}

const CountryCodeDropdown: React.FC<CountryCodeDropdownProps> = ({ selectedCountry, onSelect }) => {
    return (
        <select
            value={selectedCountry}
            onChange={(e) => onSelect(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-black rounded-lg bg-white text-black appearance-none pr-8"
        >
            {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                    {country.flag} {country.name} (+{country.dialCode})
                </option>
            ))}
        </select>
    );
};

export default function PhoneLogin() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [step, setStep] = useState('phone');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        setupRecaptcha();
    }, []);

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
        const selectedCountry = countryCodes.find(c => c.code === countryCode);
        if (!selectedCountry) {
            setError('Invalid country code');
            return;
        }
        const fullPhoneNumber = `+${selectedCountry.dialCode}${phoneNumber}`;
        if (!validatePhoneNumber(fullPhoneNumber)) {
            setError('Please enter a valid phone number');
            return;
        }

        try {
            const appVerifier = (window as any).recaptchaVerifier;
            const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
            setConfirmationResult(confirmation);
            setStep('code');
        } catch (error: any) {
            console.error('Error sending verification code:', error);
            setError(error.message || 'Failed to send verification code. Please try again.');
            // Reset reCAPTCHA
            // (window as any).recaptchaVerifier.render().then((widgetId: any) => {
            //     grecaptcha.reset(widgetId);
            // });
        }
    };

    const handleVerifyCode = async () => {
        setError('');
        if (!confirmationResult) {
            setError('Something went wrong. Please try again.');
            return;
        }
        try {
            const result = await confirmationResult.confirm(verificationCode);
            if (result.user) {
                router.push('/home');
            }
        } catch (error: any) {
            console.error('Error verifying code:', error);
            setError(error.message || 'Failed to verify code. Please try again.');
        }
    };

    return (
        <div className="min-h-screen relative">
            <Image
                src="/images/background.jpg"
                alt="Background"
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
                quality={100}
                priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center hover:scale-105 transform transition duration-300 ease-in-out">
                    <h1 className="text-3xl font-bold text-center mb-6 uppercase tracking-widest">
                        {step === 'phone' ? 'Enter Phone #' : 'Enter Code'}
                    </h1>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {step === 'phone' ? (
                        <>
                            <CountryCodeDropdown
                                selectedCountry={countryCode}
                                onSelect={setCountryCode}
                            />
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Phone Number"
                                className="w-full px-4 py-2 mb-4 border border-black rounded-lg"
                            />
                            <button
                                onClick={handleSendCode}
                                className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 uppercase"
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
                                className="w-full px-4 py-2 mb-4 border border-black rounded-lg"
                            />
                            <button
                                onClick={handleVerifyCode}
                                className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 uppercase"
                            >
                                Verify
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    );
}