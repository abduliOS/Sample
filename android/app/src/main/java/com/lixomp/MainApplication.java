package com.lixomp;

import android.app.Application;

import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new OrientationPackage(),
            new RNCWebViewPackage(),
            new NetInfoPackage(),
            new GeolocationPackage(),
            new ReactNativeYouTube(),
            new ReactVideoPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
              new LottiePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
