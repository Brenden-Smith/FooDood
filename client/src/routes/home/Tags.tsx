import { View, Text, Button } from 'react-native';

export default function Tags() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="mb-5 text-3xl font-bold">Select Tags</Text>
            <View className="flex-1 items-center rounded w-4/5 py-5 bg-slate-200 my-5">
                <Text className="text-2xl p-2">Cuisine</Text>
                <View className="grid">
                    <View className="w-16"><Button title="Tag"/></View>
                    <View className="w-16"><Button title="Tag"/></View>
                    <View className="w-16"><Button title="Tag"/></View>
                </View>
            </View>
            <View className="flex-1 items-center rounded w-4/5 py-5 bg-slate-200 my-5">
                <Text className="text-2xl p-2">Styles</Text>
                <View className="grid">
                    <View className="w-16"><Button title="Tag"/></View>
                    <View className="w-16"><Button title="Tag"/></View>
                    <View className="w-16"><Button title="Tag"/></View>
                </View>
            </View>
            <View className="flex-1 items-center rounded w-4/5 py-5 bg-slate-200 my-5">
                <Text className="text-2xl p-2">Extra</Text>
                <View className="grid">
                    <View className="w-16"><Button title="Tag"/></View>
                    <View className="w-16"><Button title="Tag"/></View>
                </View>
            </View>
        </View>
    );
}