import React from 'react'
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
import { QuizButton } from '../QuizComponent/QuizButton';
import { useParams } from 'next/navigation';
import { useFormik } from 'formik';
import DOMPurify from "dompurify";
import { useSubmitFeedbackMutation } from '@/redux/feature/general/feedback';
import { toast } from 'react-toastify';


type props = {
    title: string;
    desc: string;
    highlight: string;
    buttonTitle: string;
    placeholder: string;
}

export const Feedback = ({ title, desc, highlight, buttonTitle, placeholder }: props) => {
    const [submitFeedback] = useSubmitFeedbackMutation();
    const params = useParams();

    const uuidString = typeof params.uuid === 'string' ? params.uuid : '';

    // console.log("uuid: ", uuidString)

    const formik = useFormik({
        initialValues: {
            feedback: "",
        },

        onSubmit: async (values, { resetForm }) => {

            if (!values.feedback.trim()) {
                toast.error("Please input your feedback.");
                return;
            }
            const sanitizedFeedback = DOMPurify.sanitize(values.feedback).toString();
            console.log("Sanitized Feedback:", sanitizedFeedback);

            const feedbackData = {
                feedback: sanitizedFeedback,
                user_test_uuid: uuidString,
            };

            try {
                // Call the submitFeedback mutation function here
                await submitFeedback({ body: feedbackData }).unwrap();
                // console.log('Feedback submitted successfully:', response);
                toast.success("Your feedback has submitted successfully!", {
                    icon: <span>🎉</span>,
                    className: "Toastify__toast",
                });
                resetForm();
            } catch (error) {
                console.error('Error submitting feedback:', error);
                toast.error("Failed to submit feedback. Please try again.");
            }
        },
    });

    return (
        <div className='bg-bgPrimaryLight'>
            <div className='max-w-7xl mx-auto p-4 md:p-10 lg:p-12  grid grid-cols-1 lg:grid-cols-12 gap-4'>

                <div className="col-span-1 lg:col-span-5 ">
                    <div className=" w-full hidden lg:block">
                        <Image
                            src="/Quiz/feedback2.png"
                            alt="Stepup"
                            width={400}
                            height={400}
                            className="object-cover"
                            priority={true}
                        />
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-7 lg:pt-10">
                    <div>
                        <p className="text-md lg:text-xl text-primary mb-1 lg:mb-4">{highlight}</p>
                        <h2 className=" text-2xl lg:text-4xl font-bold mb-2 lg:mb-5 text-textprimary ">{title}</h2>
                        <p className="text-[14px] lg:text-lg text-gray-500 mb-4">
                            {desc}
                        </p>
                    </div>


                    <form onSubmit={formik.handleSubmit}>
                        <Textarea
                            name="feedback"
                            value={formik.values.feedback}
                            onChange={formik.handleChange}
                            className={`bg-white border ${!formik.values.feedback.trim() ? "border-red-500" : "border-gray-200"
                                } pl-2 rounded-xl outline-none focus:border-gray-300 text-sm text-textprimary h-24 mb-4`}
                            placeholder={placeholder}
                        />

                        {!formik.values.feedback.trim() && (
                            <p className="text-red-500 text-sm mb-4">
                                Please input your feedback.
                            </p>
                        )}

                        <div className='flex justify-end'>
                            <QuizButton title={buttonTitle} full={true} onClick={formik.handleSubmit} />
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}
