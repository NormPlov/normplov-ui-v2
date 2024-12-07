'use client'
import React, { useState } from 'react'
import QuizHeader from './QuizHeader'
import { QuizButton } from './QuizButton'
import { Link } from 'lucide-react'

type props = {
    chatTitle: string;
    chatDesc: string;
    chatButton: string;
    linkTitle: string;
    linkDesc: string;
    linkValue: string;
}

export const QuizLinkAndChatContainer = ({ chatTitle, chatDesc, chatButton, linkTitle, linkDesc, linkValue }: props) => {

    const [isCopied, setIsCopied] = useState(false); // State to track if the link has been copied

    // Function to copy the link value to the clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(linkValue) // Write the link to the clipboard
            .then(() => {
                setIsCopied(true); // Set state to true if the link was copied successfully
                setTimeout(() => setIsCopied(false), 2000); // Reset "Copied" status after 2 seconds
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });

    }

    return (
        <div className='bg-white '>
            <div className='max-w-7xl mx-auto p-4 md:p-10 lg:p-12  grid  grid-cols-1 md:grid-cols-12 '>
                <div className='col-span-4 p-4 md:p-8 lg:p-16 bg-primary  md:rounded-l-xl  rounded-t-xl space-y-4 lg:space-y-6 place-content-center'>
                    <QuizHeader title={chatTitle} description={chatDesc} type='quiz' size='sm' />
                    <QuizButton title={chatButton} full={true} color='#FFA500' />
                </div>
                <div className='col-span-8 p-4 md:p-8 lg:p-16 bg-bgPrimaryLight rounded-none md:rounded-r-xl  place-content-center'>
                    <div className=" w-full space-y-4 lg:space-y-6">
                        {/* <Input type="email" placeholder="http://example.com/link/to/document" className='pl-2 outline-none rounded-xl py-2 bg-white' /> */}

                        <QuizHeader title={linkTitle} description={linkDesc} type='result' size='sm' />


                        <div className='flex gap-2'>
                            <div className="relative w-full">
                                {/* Input field with padding to accommodate the icon */}
                                <input
                                    type="text"
                                    placeholder="http://example.com/link/to/document"
                                    value={linkValue}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-textprimary "
                                    readOnly
                                />
                                {/* Custom Icon inside the input field */}
                                <Link color='#0BBB8A' size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>


                            <QuizButton
                                title={isCopied ? 'Copied!' : 'Copy'}
                                color='#0BBB8A'
                                full={false}
                                onClick={handleCopy} // Trigger the copy action onClick
                            />
                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}
