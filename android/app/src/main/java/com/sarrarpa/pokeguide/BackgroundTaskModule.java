package com.sarrarpa.pokeguide;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.os.Build;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.os.Handler;
import android.os.Looper;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import android.content.Intent;

public class BackgroundTaskModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    private static final String CHANNEL_ID = "My Channel";
    private static final int NOTIFICATION_ID = 100;

    private Context context;

    public BackgroundTaskModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "BackgroundTask";
    }

    @ReactMethod
    public void runInBackground(String notificationSubtitle, String notificationDescription, String notificationImageUrl)
    {
        NotificationHelper notificationHelper = new NotificationHelper(reactContext);
        // Intent intent = new Intent(Intent.ACTION_SCREEN_OFF);

        Executor executor = Executors.newSingleThreadExecutor();
        Handler handler = new Handler(Looper.getMainLooper());

        executor.execute(new Runnable() {
            @Override
            public void run() {
                // Call your function here
                Log.d("BackgroundTaskModule", "runInBackground is running in background");
                String result = "Background task completed";

                handler.post(new Runnable() {
                    @Override
                    public void run() {
                        Log.d("BackgroundTaskModule", "handler is running and value of notificationSubtitle" +
                                notificationSubtitle+
                                "notificationDescription"+
                                        notificationDescription+
                                "notificationImageUrl"+notificationImageUrl
                                );

                        notificationHelper.createNotification(notificationSubtitle, notificationDescription);
                    }
                });
            }
        });
    }
}
