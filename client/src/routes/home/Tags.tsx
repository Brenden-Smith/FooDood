import { View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, Switch, Modal, Alert } from 'react-native';
import React, { useState, } from "react";
import Settings from './Settings';
import { SelectableGroup } from '@/components';
import { ScrollView } from 'react-native-gesture-handler';


export default function Tags() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // selected tags
    const [isChecked, setChecked] = useState(false);



    return (
        // to add a safeareaview without messing up the flexbox, wrap the view in a flex-1 view
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView style={{ height: '100%' }}>
                <View className="items-center justify-center">
                    <View className="items-center rounded w-4/5 py-5 bg-slate-200 my-5">
                        <Text className="text-2xl p-2">Cuisine</Text>
                            <SelectableGroup
                                items={[
                                    { title: "Mexican", value: "mexican" },
                                    { title: "Indian", value: "indian" },
                                    { title: "Thai", value: "thai" },
                                    { title: "American", value: "american" },
                                    { title: "Chinese", value: "chinese" },
                                    { title: "Japanese", value: "japanese" },
                                    { title: "Greek", value: "greek" },
                                    { title: "Latin", value: "latin" },
                                    { title: "Korean", value: "korean" },
                                    { title: "Cuban", value: "cuban" },
                                    { title: "Italian", value: "italian" },
                                    { title: "French", value: "french" },
                                    { title: "Vietnamese", value: "vietnamese" },
                                    { title: "Mediterranean", value: "mediterranean" },
                                    { title: "Spanish", value: "spanish" },
                                    { title: "Middle Eastern", value: "middle eastern" },
                                    { title: "Caribbean", value: "caribbean" },
                                ]}
									scrollEnabled={false}
									onChange={(values) => setSelectedTags(values)}
									values={selectedTags}
									numColumns={2}
									ItemComponent={({ item, selected }) => (
										<View
											style={{
												backgroundColor: selected ? "#add8e6" : "white",
												alignItems: "center",
												padding: 8,
												borderRadius: 5,
												width: '100%'
											}}
										>
											<Text>{item.title}</Text>
										</View>
									)}
									ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
									itemStyle={{
										height: 50,
										width: 150,
										marginHorizontal: 5,
									}}
                            />
                    </View>
                    <View className="items-center rounded w-4/5 py-5 bg-slate-200 my-5">
                        <Text className="text-2xl p-2">Styles</Text>
							<SelectableGroup
								items={[
									{ title: "Burger", value: "burger" },
									{ title: "Pizza", value: "pizza" },
									{ title: "Bowl", value: "bowl" },
									{ title: "Plate", value: "plate" },
									{ title: "Burrito", value: "burrito" },
									{ title: "Dessert", value: "dessert" },
									{ title: "Salad", value: "salad" },
									{ title: "Sandwich", value: "sandwich" },
									{ title: "Wrap", value: "wrap" },
									{ title: "Fries", value: "fries" },
									{ title: "Tacos", value: "tacos" },
									{ title: "Noodles", value: "noodles" },
									{ title: "Rice", value: "rice" },
									{ title: "Soup", value: "soup" },
									{ title: "Pasta", value: "pasta" },
									{ title: "Steak", value: "steak" },
									{ title: "Chicken", value: "chicken" },
								]}
								scrollEnabled={false}
								values={selectedTags}
								numColumns={3}
								onChange={(values) => setSelectedTags(values)}
								ItemComponent={({ item, selected }) => (
									<View
										style={{
											backgroundColor: selected ? "#add8e6" : "white",
											alignItems: "center",
											padding: 8,
											borderRadius: 5,
											width: '100%'
										}}
									>
										<Text>{item.title}</Text>
									</View>
								)}
								ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
								itemStyle={{
									height: 50,
									width: 85,
									marginHorizontal: 5,
								}}
                        />

                    </View>
                    <View className="items-center rounded w-4/5 py-5 bg-slate-200 my-5">
                        <Text className="text-2xl p-2">Extra</Text>
                            <SelectableGroup
                                items={[
                                    { title: "Vegan", value: "vegan" },
                                    { title: "Vegetarian", value: "vegetarian" },
                                    { title: "Gluten Free", value: "gluten free" },
                                    { title: "Halal", value: "halal" },
                                    { title: "Kosher", value: "kosher" },
                                    { title: "Dairy Free", value: "dairy free" },
                                    { title: "Nut Free", value: "nut free" },
                                    { title: "Egg Free", value: "egg free" },
                                    { title: "Soy Free", value: "soy free" },
                                    { title: "Peanut Free", value: "peanut free" },
                                    { title: "Seafood Free", value: "seafood free" },
                                    { title: "Shellfish Free", value: "shellfish free" },
                                    { title: "Sesame Free", value: "sesame free" },
                                    { title: "Wheat Free", value: "wheat free" },
                                    { title: "Low Sodium", value: "low sodium" },
                                    { title: "Low Sugar", value: "low sugar" },
                                    { title: "Low Fat", value: "low fat" },
                                    { title: "Low Carb", value: "low carb" },
                                    { title: "Low Calorie", value: "low calorie" },
                                    { title: "Low Cholesterol", value: "low cholesterol" },
                                    { title: "Low Protein", value: "low protein" },
                                    { title: "Low Saturated Fat", value: "low saturated fat" },

									]}
									numColumns={2}
                                scrollEnabled={false}
                                values={selectedTags}
                                onChange={(values) => setSelectedTags(values)}
									ItemComponent={({ item, selected }) => (
										<View
											style={{
												backgroundColor: selected ? "#add8e6" : "white",
												alignItems: "center",
												padding: 8,
												borderRadius: 5,
												width: '100%'
											}}
										>
											<Text>{item.title}</Text>
										</View>
									)}
									ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
									itemStyle={{
										height: 50,
										width: 150,
										marginHorizontal: 5,
									}}
                            />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}