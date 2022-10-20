package com.ftc.android;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; // here
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;


public class MainActivity extends ReactActivity {

  /**droid
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "FantasyTennisClub";
  }

    @Override
protected void onCreate(Bundle savedInstanceState) {
  SplashScreen.show(this);  // here
  super.onCreate(savedInstanceState);
}
  }

