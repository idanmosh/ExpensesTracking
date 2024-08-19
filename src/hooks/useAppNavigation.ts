import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/Navigation';

const useAppNavigation = () => useNavigation<NavigationType>();

export default useAppNavigation;
