import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { Item, items } from "../data";
import { createScreen, DetailScreenWithMore } from "../screens";

const name = "PushPopSameScreen2";

const Stack = createSharedElementStackNavigator({
  name,
  debug: false,
});

const PressableDetailWithMoreScreen = createScreen(
  DetailScreenWithMore,
  undefined,
  undefined,
  {
    onPress: (event: any) => {
      let nextItem = event.nextItem;
      if (event.item) {
        const item: Item = event.item;
        const itemIdx = items.indexOf(item);
        nextItem = items[itemIdx < items.length - 2 ? itemIdx + 1 : 0];
      } else {
      }
      event.navigation.push("Detail", {
        item: nextItem,
      });
    },
  }
);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Detail"
        component={PressableDetailWithMoreScreen}
        initialParams={{ item: items[0] }}
        sharedElements={(fromRoute, toRoute, showing) => {
          let item = undefined;

          if (!showing && toRoute.name == fromRoute.name) {
            // we are naviating backwards
            // to the same screen, so pick the params from the
            // otherRoute (aka "from route")
            item = toRoute.params.item;
          } else {
            item = fromRoute.params.item;
          }

          return [
            { id: `${item.id}.image` },
            { id: `${item.id}.title`, animation: "fade" },
            { id: "close", animation: "fade" },
          ];
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
