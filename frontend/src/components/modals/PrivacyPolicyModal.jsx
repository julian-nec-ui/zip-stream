import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Privacy Information
                                    </Dialog.Title>
                                    <div className="h-96 overflow-y-auto p-2 bg-slate-100 text-slate-500/30 rounded-xl
                                        [&::-webkit-scrollbar]:w-2
                                      [&::-webkit-scrollbar-track]:bg-slate-100
                                        [&::-webkit-scrollbar-track]:rounded-full
                                      [&::-webkit-scrollbar-thumb]:bg-indigo-500
                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                      hover:[&::-webkit-scrollbar-thumb]:bg-indigo-400 shadow-sm">
                                        <p className="text-sm text-gray-600 m-2">
                                            Privacy Policy of Company Name
                                            Company Name operates the Website Name website,
                                            which provides the SERVICE.

                                            This page is used to inform website visitors regarding our
                                            policies with the collection, use, and disclosure of
                                            Personal Information if anyone decided to use our Service,
                                            the Website Name website.

                                            If you choose to use our Service, then you agree to the
                                            collection and use of information in relation with this policy.
                                            The Personal Information that we collect are used for providing
                                            and improving the Service. We will not use or share your information
                                            with anyone except as described in this Privacy Policy.

                                            The terms used in this Privacy Policy have the same meanings as in
                                            our Terms and Conditions, which is accessible at Website URL, unless
                                            otherwise defined in this Privacy Policy.

                                            Information Collection and Use
                                            For a better experience while using our Service, we may require you
                                            to provide us with certain personally identifiable information,
                                            including but not limited to your name, phone number, and postal
                                            address. The information that we collect will be used to contact
                                            or identify you.

                                            Log Data
                                            We want to inform you that whenever you visit our Service, we collect
                                            information that your browser sends to us that is called Log Data.
                                            This Log Data may include information such as your computer's
                                            Internet Protocol (“IP”) address, browser version, pages of our
                                            Service that you visit, the time and date of your visit, the time
                                            spent on those pages, and other statistics.

                                            Cookies
                                            Cookies are files with small amount of data that is commonly used an
                                            anonymous unique identifier. These are sent to your browser from the
                                            website that you visit and are stored on your computer's hard drive.

                                            Our website uses these “cookies” to collection information and to
                                            improve our Service. You have the option to either accept or refuse
                                            these cookies, and know when a cookie is being sent to your computer.
                                            If you choose to refuse our cookies, you may not be able to use some
                                            portions of our Service.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onClose}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>

                        </div>

                    </div>

                </Dialog>
            </Transition>
        </>
    );
}
