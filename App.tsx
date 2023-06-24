import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { Suspense, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import useSWR from 'swr';

function Spacer({ height = 16 }: { height?: number }) {
  return <MotiView style={{ height }} />;
}

function MySkeleton() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const colorMode = isDarkMode ? 'dark' : 'light';

  return (
    <Pressable
      onPress={() => setIsDarkMode(!isDarkMode)}
      style={styles.container}>
      <MotiView
        transition={{
          type: 'timing',
        }}
        animate={{ backgroundColor: '#000000' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Skeleton
            colorMode={colorMode}
            radius='round'
            height={50}
            width={50}
          />
          <View style={{ paddingLeft: 20 }}>
            <Skeleton colorMode={colorMode} width={250} height={15} />
            <Spacer height={10} />
            <Skeleton colorMode={colorMode} width={200} height={15} />
            <Spacer height={10} />
            <Skeleton colorMode={colorMode} width={150} height={15} />
          </View>
        </View>
        <Spacer />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '30%',
              justifyContent: 'space-between',
            }}>
            <Skeleton colorMode={colorMode} width={20} height={15} />
            <Skeleton colorMode={colorMode} width={20} height={15} />
            <Skeleton colorMode={colorMode} width={20} height={15} />
          </View>
          <Skeleton colorMode={colorMode} width={100} height={15} />
        </View>
        <Spacer />
        <View>
          <Skeleton colorMode={colorMode} width={'100%'} height={15} />
          <Spacer height={10} />
          <Skeleton colorMode={colorMode} width={'90%'} height={15} />
          <Spacer height={10} />
          <Skeleton colorMode={colorMode} width={'95%'} height={15} />
        </View>
        <Spacer height={10} />
        <Skeleton colorMode={colorMode} width={'100%'} height={250} />
      </MotiView>
    </Pressable>
  );
}

function UserInfo() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR('https://randomuser.me/api', fetcher, {
    suspense: true,
  });
  const userData = data.results[0];

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: 'white',
          }}
          source={{ uri: userData.picture.large }}
        />
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 22, color: 'white' }}>
            {userData.name.first}
          </Text>
          <Text style={{ fontSize: 22, color: 'white' }}>
            {userData.name.last}
          </Text>
          <Text style={{ fontSize: 22, color: 'white' }}>
            {userData.name.gender}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 22, color: 'white' }}>{userData.email}</Text>
      <Text style={{ fontSize: 22, color: 'white' }}>{userData.cell}</Text>
      <Image
        style={{ width: 300, height: 200, borderRadius: 10, marginTop: 20 }}
        source={{ uri: userData.picture.large }}
      />
    </>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Suspense fallback={<MySkeleton />}>
        <UserInfo />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
