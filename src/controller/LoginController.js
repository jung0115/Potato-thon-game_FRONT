import useUserModel from "../model/useUserModel";
import { useAuth } from "../view/components/Context";

const LoginController = ({ onClose }) => {
    const { user, token, authSignIn } = useUserModel();
    const { login } = useAuth();

    const handleLogin = async (userId, userPw) => {
        if (!userId || !userPw) {
            alert('아이디 또는 비밀번호를 입력해주세요.');
        } 

        await authSignIn(userId, userPw);

        if (token) {
            onClose(user.name);
            login(user);
        }
    };

    return { handleLogin, user, token };
}
export default LoginController;