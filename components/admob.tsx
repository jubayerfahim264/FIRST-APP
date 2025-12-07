import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';

/**
 * AdMob Configuration
 * 
 * App ID: ca-app-pub-3781453093578120~1592794985
 * 
 * Ad Unit IDs:
 * - Banner Ad: ca-app-pub-3781453093578120/5843272434
 * - Interstitial Ad: ca-app-pub-3781453093578120/5668830856
 * - Rewarded Ad: ca-app-pub-3781453093578120/6905890901
 */

// Ad Unit IDs Configuration
const AD_UNITS = {
  BANNER: 'ca-app-pub-3781453093578120/5843272434',
  INTERSTITIAL: 'ca-app-pub-3781453093578120/5668830856',
  REWARDED: 'ca-app-pub-3781453093578120/6905890901',
};

interface AdMobBannerProps {
  unitId?: string;
  size?: 'FULL_WIDTH' | 'SMART_BANNER';
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ 
  unitId = AD_UNITS.BANNER,
  size = 'SMART_BANNER' 
}) => {
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    // Simulate ad loading for banner
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.bannerContainer}>
      {loaded ? (
        <View style={styles.adSpace}>
          {/* Google AdMob Banner will render here when google-mobile-ads-react-native is configured */}
          <ThemedText style={styles.adPlaceholder}>[ Google AdMob Banner ]</ThemedText>
        </View>
      ) : (
        <View style={styles.loadingSpace} />
      )}
    </View>
  );
};

let interstitialLoadPromise: Promise<void> | null = null;

export const AdMobInterstitial = {
  requestInterstitial: async (unitId: string = AD_UNITS.INTERSTITIAL) => {
    try {
      console.log('Requesting interstitial ad with unit:', unitId);
      // When google-mobile-ads-react-native is installed:
      // const interstitialRef = InterstitialAd.createForAdRequest(unitId);
      // await interstitialRef.load();
      interstitialLoadPromise = Promise.resolve();
    } catch (error) {
      console.warn('Failed to request interstitial ad:', error);
    }
  },
  showInterstitial: async () => {
    try {
      console.log('Attempting to show interstitial ad');
      // When google-mobile-ads-react-native is installed:
      // if (interstitialLoadPromise) {
      //   await interstitialLoadPromise;
      //   interstitialRef.show();
      // }
    } catch (error) {
      console.warn('Failed to show interstitial ad:', error);
    }
  },
};

export const AdMobRewarded = {
  requestRewardedAd: async (unitId: string = AD_UNITS.REWARDED) => {
    try {
      console.log('Requesting rewarded ad with unit:', unitId);
      // When google-mobile-ads-react-native is installed:
      // const rewardedRef = RewardedAd.createForAdRequest(unitId);
      // await rewardedRef.load();
    } catch (error) {
      console.warn('Failed to request rewarded ad:', error);
    }
  },
  showRewardedAd: async () => {
    try {
      console.log('Attempting to show rewarded ad');
      // When google-mobile-ads-react-native is installed:
      // rewardedRef.show();
    } catch (error) {
      console.warn('Failed to show rewarded ad:', error);
    }
  },
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  adSpace: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  loadingSpace: {
    width: '100%',
    height: 50,
  },
  adPlaceholder: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
