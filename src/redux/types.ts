type NotificationStatus = "success" | "failed";

export type Notification = {
  status: NotificationStatus;
  message: string;
  name?: string;
};

export type MainState = {
  notification?: Notification;
};

export type RootState = {
  main: MainState;
};

export type SettingsState = {
  loading: boolean;
  fontSize: string;
  fontFamily: string;
  spacing: string;
  bg: string;
};
