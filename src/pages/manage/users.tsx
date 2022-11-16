import { Alert, Button } from 'antd';
import { firebaseAuth } from '../../utils/firebase/firebase';
import { sendMail2VerifyEmail } from '../../utils/firebase/firebaseAuth';

const ManageUsers = () => {

  console.log(firebaseAuth.currentUser);
  return (
    <>
      {firebaseAuth.currentUser?.emailVerified ? (
        <Alert
          type="warning"
          closable={false}
          action={<Button onClick={() => sendMail2VerifyEmail()}>Gửi email xác thực</Button>}
          message="Bạn chưa xác thực email của mình!"
        />
      ) : null}
    </>
  )
};

export default ManageUsers;