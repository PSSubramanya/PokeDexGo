package com.sarrarpa.pokeguide;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import androidx.core.app.NotificationCompat;
import android.app.NotificationChannel;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;

public class NotificationHelper {
    private Context mContext;
    private NotificationManager mNotificationManager;
    private NotificationCompat.Builder mBuilder;
    public static final String NOTIFICATION_CHANNEL_ID = "10001";


    public NotificationHelper(Context context) {
        mContext = context;
    }

    public void createNotification(String title, String message)
    {

            // The app is in the background

            /**Creates an explicit intent for an Activity in your app**/
            mBuilder = new NotificationCompat.Builder(mContext,NOTIFICATION_CHANNEL_ID);
            mBuilder.setSmallIcon(R.mipmap.ic_launcher);
            mBuilder.setContentTitle(title)
                    .setContentText(message)
                    .setAutoCancel(false)
                    .setPriority(Notification.PRIORITY_MAX);

            mNotificationManager = (NotificationManager) mContext.getSystemService(Context.NOTIFICATION_SERVICE);

            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O)
            {
                int importance = NotificationManager.IMPORTANCE_HIGH;
                NotificationChannel notificationChannel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, "NOTIFICATION_CHANNEL_NAME", importance);
                mBuilder.setChannelId(NOTIFICATION_CHANNEL_ID);
                mNotificationManager.createNotificationChannel(notificationChannel);
            }
            mNotificationManager.notify(0, mBuilder.build());
        }
}
