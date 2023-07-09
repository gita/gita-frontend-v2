import { connect } from "react-redux";
import NotificationBanner from "./Shared/NotificationBanner";

const Main = ({ Component, pageProps, notification }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      {notification && (
        <NotificationBanner
          message={notification.message}
          status={notification.status}
        />
      )}
      {getLayout(<Component {...pageProps} />)}
    </>
  );
};

const mapStateToPros = (state) => {
  return {
    notification: state.main?.notification,
  };
};

export default connect(mapStateToPros)(Main);
