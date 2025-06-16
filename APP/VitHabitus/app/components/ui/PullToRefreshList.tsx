import React from "react";
import { FlatList, RefreshControl, FlatListProps } from "react-native";

interface PullToRefreshListProps<T> extends FlatListProps<T> {
  onRefresh: () => void;
  refreshing: boolean;
}

export default function PullToRefreshList<T>(
  props: PullToRefreshListProps<T>
) {
  const { onRefresh, refreshing, ...rest } = props;

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      {...rest}
    />
  );
}