import React, { ReactNode } from 'react';
import { ViewProps, Platform, SafeAreaView as IOSSafeAreaView } from 'react-native';
import { SafeAreaView as AndroidSafeAreaView } from 'react-native-safe-area-context';

interface CustomSafeAreaViewProps extends ViewProps {
	children?: ReactNode;
}

export default function CustomSafeAreaView({ children, ...props }: CustomSafeAreaViewProps) {
	return <>{Platform.OS === 'ios' ? <IOSSafeAreaView {...props}>{children}</IOSSafeAreaView> : <AndroidSafeAreaView {...props}>{children}</AndroidSafeAreaView>}</>;
}
