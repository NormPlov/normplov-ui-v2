import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicPersonalityResultComponent } from './PublicPersonalityResultComponent';
import { PublicSkillResultComponent } from './PublicSkillResultComponent';
import { PublicInterestResultComponent } from './PublicInterestResultComponent';
import { PublicLearningStyleResultComponent } from './PublicLearningStyleResultComponent';
import { PublicValueResultComponent } from './PublicValueResultComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { FinalJobRecommendComponent } from '../ResultContentComponent/FinalJobRecommendComponent';
import { PublicFinalJobRecommendComponent } from './PublicFinalJobComponent';
export const PublicAllResultComponent = () => {

    const [selectedTab, setSelectedTab] = useState('personality');

    const handleSelectChange = (value: string) => {
        setSelectedTab(value);
    };


    return (
        <>
            <div className='bg-white'>
                <div >
                    {/* Tabs for larger screens */}
                    <div className="hidden lg:block pt-4 lg:pt-6">
                        <Tabs defaultValue="personality" className="w-full">
                            <div className=' max-w-7xl mx-auto'> 
                                <TabsList>
                                    <TabsTrigger value="personality">ចរិកលក្ខណៈ</TabsTrigger>
                                    <TabsTrigger value="skill">ភាពខ្លាំងខ្សោយ</TabsTrigger>
                                    <TabsTrigger value="interest">ចំណាប់អារម្មណ៍</TabsTrigger>
                                    <TabsTrigger value="value">គុណតម្លៃ</TabsTrigger>
                                    <TabsTrigger value="learningStyle">របៀបនៃការសិក្សា</TabsTrigger>
                                    <TabsTrigger value="career">អាជីពការងារ</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="personality"><PublicPersonalityResultComponent /></TabsContent>
                            <TabsContent value="skill"><PublicSkillResultComponent /></TabsContent>
                            <TabsContent value="interest"><PublicInterestResultComponent /></TabsContent>
                            <TabsContent value="value"><PublicValueResultComponent /></TabsContent>
                            <TabsContent value="learningStyle"><PublicLearningStyleResultComponent /></TabsContent>
                            <TabsContent value="career"><PublicFinalJobRecommendComponent /></TabsContent>
                        </Tabs>
                    </div>

                    {/* Dropdown for small screens */}
                    <div className="lg:hidden pt-4 lg:pt-6 mx-4">
                        <Select value={selectedTab} onValueChange={handleSelectChange} >
                            <SelectTrigger className="w-full border-2 border-gray-200 outline-none text-gray-700">
                                <SelectValue placeholder="Select a tab" />
                            </SelectTrigger>
                            <SelectContent className='font-light text-gray-700'>
                                <SelectItem value="personality">ចរិកលក្ខណៈ</SelectItem>
                                <SelectItem value="skill">ភាពខ្លាំងខ្សោយ</SelectItem>
                                <SelectItem value="interest">ចំណាប់អារម្មណ៍</SelectItem>
                                <SelectItem value="value">គុណតម្លៃ</SelectItem>
                                <SelectItem value="learningStyle">របៀបនៃការសិក្សា</SelectItem>
                                <SelectItem value="career">អាជីពការងារ</SelectItem>
                            </SelectContent>
                        </Select>




                        {/* Display selected content based on dropdown */}
                        {selectedTab === 'personality' && <PublicPersonalityResultComponent />}
                        {selectedTab === 'skill' && <PublicSkillResultComponent />}
                        {selectedTab === 'interest' && <PublicInterestResultComponent />}
                        {selectedTab === 'value' && <PublicValueResultComponent />}
                        {selectedTab === 'learningStyle' && <PublicLearningStyleResultComponent />}
                        {selectedTab === 'career' && <PublicFinalJobRecommendComponent />}


                    </div>
                </div>




              
            </div>

        </>

    )
}
