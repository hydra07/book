// "use client";
import { useState, useCallback, ChangeEvent } from 'react';
import { Button, ButtonGroup, Input } from '@material-tailwind/react';
import { axiosWithAuth } from '@/lib/axios';
import User from '@/types/user';
import { toast } from 'react-toastify';

export default ({
    isChangePassword,
    setIsChangePassword,
    user,
}: {
    isChangePassword: boolean;
    setIsChangePassword: any;
    user: User;
}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const { user, status } = useUser();
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { id, value } = event.target;
            if (id === 'oldPassword') setOldPassword(value);
            else if (id === 'newPassword') setNewPassword(value);
            else if (id === 'confirmPassword') setConfirmPassword(value);
        },
        [],
    );

    const handleSubmit = useCallback(
        async (event: ChangeEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (newPassword !== confirmPassword) {
                toast.error('Mật khẩu không khớp');
                return;
            }
            const token = user.accessToken;
            if (!token) return;
            const res = axiosWithAuth(token).post('/user/resetPassword', {
                id: user.id,
                email: user.email,
                password: oldPassword,
                newPassword: newPassword,
            })
            console.log('Password changed successfully:', res);
            setIsChangePassword(false);
        },
        [oldPassword, newPassword, confirmPassword, user.accessToken]
    );

    return (
        <form
            className="backdrop-blur-3xl bg-white/5 p-4 rounded shadow w-3/5 h-5/6 flex flex-col relative"
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl justify-center self-center">Change Password</h1>
            <div className="w-5/6 justify-center self-center flex flex-col space-y-2">
                <Input
                    className="h-16 mb-4 text-2xl "
                    size="lg"
                    color="white"
                    id="oldPassword"
                    type="password"
                    label="Old Password"
                    required
                    autoComplete="off"
                    value={oldPassword}
                    onChange={handleChange}
                    crossOrigin={null}
                />
                <Input
                    className="h-16 mb-4 text-2xl "
                    size="lg"
                    color="white"
                    id="newPassword"
                    type="password"
                    label="New Password"
                    required
                    autoComplete="off"
                    value={newPassword}
                    onChange={handleChange}
                    crossOrigin={null}
                />
                <Input
                    className="h-16 mb-4 text-2xl "
                    size="lg"
                    color="white"
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    required
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={handleChange}
                    crossOrigin={null}
                />
            </div>
            <div className="mt-auto flex justify-center w-1/3 self-center">
                <ButtonGroup placeholder={null}>
                    <Button
                        className="text-white content-center bg-red-600 w-1/2"
                        onClick={() => setIsChangePassword(false)}
                        placeholder={null}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="text-white content-center bg-green-600 w-1/2"
                        type="submit"
                        placeholder={null}
                    >
                        Save
                    </Button>
                </ButtonGroup>
            </div>
        </form>
    );
}
