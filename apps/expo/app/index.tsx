import React, { useState } from 'react';
import { TamaguiProvider, createTamagui, YStack, Text, Slider, Button, Input, Theme, ScrollView } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';

const config = createTamagui(defaultConfig);

type Conf = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

const moods = [
  { emoji: '😀', label: 'Happy' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😐', label: 'Neutral' },
];

export default function MoodTrackerScreen() {
  const [mood, setMood] = useState<string | null>(null);
  const [sleep, setSleep] = useState<number>(6);
  const [notes, setNotes] = useState<string>('');

  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <YStack gap="$4">
            <Text fontSize="$8" fontWeight="600">How are you feeling today?</Text>

            <YStack flexDirection="row" gap="$3">
              {moods.map((item) => (
                <Button
                  key={item.label}
                  onPress={() => setMood(item.label)}
                  theme={mood === item.label ? 'blue' :'light_accent'}
                >
                  {item.emoji}
                </Button>
              ))}
            </YStack>

            <Text fontSize="$6">Sleep last night: {sleep} hours</Text>
            <Slider

              defaultValue={[sleep]}
              min={1}
              max={12}
              step={1}
              onValueChange={(val) => setSleep(val[0])}
            />

            <Text fontSize="$6">Notes</Text>
            <Input
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
              placeholder="Write any notes here..."
            />

            <Button onPress={() => {
              console.log({ mood, sleep, notes });
            }}>Submit</Button>
          </YStack>
        </ScrollView>
      </Theme>
    </TamaguiProvider>
  );
}
