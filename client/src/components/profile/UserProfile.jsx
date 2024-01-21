import React from 'react';
import { Button } from "@material-tailwind/react";

const UserProfile = ({ name, gender, image }) => {
    return (
        <div className="w-full rounded-xl bg-white-default overflow-hidden mt-3-5">
            <div class="w-full bg-cover bg-no-repeat pt-full-400-1580 relative"></div>
            <div className="w-full px-7-5 flex-row-center justify-between h-30">
                <div className="flex flex-row">
                    <div className="w-40 h-40 rounded-md z-10 -mt-23-75 p-1-25 bg-white-default">
                        <div className="wh-full">
                            <div className="overflow-hidden wh-full rounded">
                                <img src="https://placekitten.com/100/100"></img>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-80 ml-7-5">
                        <h2 className="text-2xl-24-30 fm-t-ellipsis-2 text-black-222 font-bold">Khanh Suy</h2>
                        <p className="text-lg-18-30 text-black-222 mt-2-25">Male</p>
                    </div>
                    <div className="flex flex-row items-center justify-end ml-auto mb-10">
                        <div className="w-max min-w-23-5 mr-6 last:mr-0 flex flex-col items-center">
                            <img src="https://sangtac.waka.vn/svgs/icon-count-stories.svg" alt className="w-9 h-9 !cursor-text" />
                            <span className="text-sm-14-20 mt-2-25 text-black-102 text-center">Số truyện</span>
                            <span className="text-lg-18-21 text-black-222 font-bold mt-2-25">2</span>
                        </div>
                        <div className="w-max min-w-23-5 mr-6 last:mr-0 flex flex-col items-center">
                            <img src="https://sangtac.waka.vn/svgs/icon-count-follow.svg" alt className="w-9 h-9 !cursor-text" />
                            <span className="text-sm-14-20 mt-2-25 text-black-102 text-center">Người theo dõi</span>
                            <span className="text-lg-18-21 text-black-222 font-bold mt-2-25">247</span>
                        </div>
                        <div className="w-max min-w-23-5 mr-6 last:mr-0 flex flex-col items-center">
                            <img src="https://sangtac.waka.vn/svgs/icon-count-nominations.svg" alt className="w-9 h-9 !cursor-text" />
                            <span className="text-sm-14-20 mt-2-25 text-black-102 text-center">Đánh giá</span>
                            <span className="text-lg-18-21 text-black-222 font-bold mt-2-25">69</span>
                        </div>
                        <div className="w-45 h-10 border border-cdv rounded-full cursor-pointer flex-row-center justify-center">
                            <Button className="bg-gray-900 w-fit lg:ml-auto">Follow</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;
