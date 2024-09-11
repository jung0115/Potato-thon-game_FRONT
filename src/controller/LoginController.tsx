import { useAuth } from "../view/components/Context";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.tsx";
import LoginModel from "../model/LoginModel.tsx";

interface LoginControllerProps {
    onClose: (userName: string) => void;
}

const LoginController = ({ onClose }: LoginControllerProps) => {
    const { authSignIn } = LoginModel();
    const { login } = useAuth();
    const user = useSelector((state: RootState) => state.user.user);
    const token = useSelector((state: RootState) => state.user.token);

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