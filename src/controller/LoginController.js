import { useAuth } from "../view/components/Context";
import LoginModel from "../model/LoginModel.ts";

interface LoginControllerProps {
    onClose: (userName: string) => void;
}

const LoginController = ({ onClose }: LoginControllerProps) => {
    const { user, token, authSignIn } = LoginModel();
    const { login } = useAuth();

    const handleLogin = async (userId: string, userPw: string) => {
        if (!userId || !userPw) {
            alert('아이디 또는 비밀번호를 입력해주세요.');
            return;
        }

        await authSignIn(userId, userPw);

        if (token && user) {
            onClose(user.name);
            login(user);
        }
    };

    return { handleLogin, user, token };
}

export default LoginController;