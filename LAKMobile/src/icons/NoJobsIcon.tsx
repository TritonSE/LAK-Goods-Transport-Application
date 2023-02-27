import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export const NoJobsIcon = () => (
  <View>
    <Svg width="84" height="84" viewBox="0 0 84 84" fill="none">
        <Path d="M9.03999 21.9459L9.49444 23.0129L9.95827 21.95C10.5592 20.5729 11.3707 19.3755 12.3926 18.3536C13.4145 17.3317 14.5978 16.5342 15.9459 15.96L17.0129 15.5056L15.95 15.0417C14.5729 14.4408 13.3755 13.6293 12.3536 12.6074C11.3317 11.5855 10.5342 10.4022 9.96001 9.05407L9.50556 7.98709L9.04173 9.05003C8.44084 10.4271 7.62935 11.6245 6.60738 12.6464C5.58549 13.6683 4.40219 14.4658 3.05407 15.04L1.98709 15.4944L3.05003 15.9583C4.42707 16.5592 5.62448 17.3707 6.64645 18.3926C7.66834 19.4145 8.46579 20.5978 9.03999 21.9459ZM74.96 24.0541L74.5056 22.9871L74.0417 24.05C73.4408 25.4271 72.6293 26.6245 71.6074 27.6464C70.5855 28.6683 69.4022 29.4658 68.0541 30.04L66.9871 30.4944L68.05 30.9583C69.4271 31.5592 70.6245 32.3706 71.6464 33.3926C72.6684 34.4145 73.4658 35.5978 74.04 36.9459L74.4944 38.0129L74.9583 36.95C75.5592 35.5729 76.3707 34.3755 77.3926 33.3536C78.4145 32.3317 79.5978 31.5342 80.9459 30.96L82.0129 30.5056L80.95 30.0417C79.5729 29.4408 78.3755 28.6294 77.3536 27.6074C76.3316 26.5855 75.5342 25.4022 74.96 24.0541ZM59.0409 28.198L59.5 29.2628L59.9591 28.198C61.1587 25.4161 62.803 22.9823 64.8926 20.8926C66.9823 18.803 69.4161 17.1587 72.198 15.9591L73.2628 15.5L72.198 15.0409C69.4161 13.8413 66.9823 12.197 64.8926 10.1074C62.803 8.01775 61.1587 5.5839 59.9591 2.80202L59.5 1.73722L59.0409 2.80202C57.8413 5.5839 56.197 8.01775 54.1074 10.1074C52.0177 12.197 49.5839 13.8413 46.802 15.0409L45.7372 15.5L46.802 15.9591C49.5839 17.1587 52.0177 18.803 54.1074 20.8926C56.197 22.9823 57.8413 25.4161 59.0409 28.198ZM21.8125 24.4062V24.4169L21.813 24.4275C21.8672 25.7026 22.1117 26.9146 22.5484 28.0608C22.9892 29.218 23.6501 30.2631 24.5265 31.1942C25.4021 32.1246 26.4044 32.853 27.532 33.3755C28.6682 33.9021 29.8861 34.1641 31.1797 34.1641C32.144 34.1641 33.0384 34.0124 33.857 33.7019C34.6557 33.3989 35.4113 32.9864 36.1231 32.4662C36.848 31.9365 37.4618 31.2946 37.9629 30.543C38.464 29.7914 38.8256 28.9702 39.0476 28.0822C39.1041 27.8563 39.1406 27.642 39.1406 27.4531C39.1406 26.715 38.8619 26.0688 38.3301 25.5371C37.7984 25.0053 37.1522 24.7266 36.4141 24.7266H36.3878L36.3617 24.7293C35.8351 24.7847 35.3744 24.9001 35.024 25.1103C34.6685 25.3236 34.3907 25.6473 34.177 26.0442C33.9879 26.3954 33.8242 26.7359 33.6869 27.0655C33.5727 27.3395 33.409 27.6342 33.1905 27.9498C33.0034 28.2199 32.7681 28.4241 32.4795 28.5684C32.2116 28.7024 31.8037 28.7891 31.2188 28.7891C30.6733 28.7891 30.1508 28.6648 29.6455 28.4122C29.1311 28.155 28.705 27.8196 28.3607 27.4065C28.0033 26.9776 27.7171 26.501 27.5018 25.9747C27.2912 25.4599 27.1875 24.9381 27.1875 24.4062C27.1875 23.4889 27.38 22.6859 27.7537 21.9853C28.1429 21.2555 28.6547 20.5966 29.2923 20.008C29.9238 19.4251 30.6391 18.9764 31.4411 18.6605C32.2433 18.3445 33.0523 18.188 33.8709 18.1875C35.3599 18.2129 36.6399 18.5473 37.7264 19.1751C38.8343 19.8152 39.7565 20.6633 40.4962 21.7236C41.244 22.7954 41.8067 23.9943 42.183 25.3237C42.5596 26.6546 42.7479 27.9686 42.75 29.2668C42.7242 29.5563 42.7109 29.8244 42.7109 30.0703C42.7109 30.2855 42.699 30.5153 42.6746 30.76C42.4186 33.0627 41.9084 35.0678 41.1519 36.7826C40.3919 38.5052 39.3924 40.0483 38.1532 41.414C36.908 42.7862 35.4708 43.995 33.8397 45.0399C32.1926 46.095 30.3885 47.0875 28.4266 48.0169C27.9183 48.2563 27.5075 48.5849 27.226 49.0154C26.9435 49.4476 26.8125 49.9499 26.8125 50.5C26.8125 51.2487 27.0674 51.8995 27.5839 52.4161C28.0961 52.9282 28.7318 53.1875 29.4609 53.1875C29.8681 53.1875 30.2432 53.1301 30.5624 52.9882L30.5629 52.9879C32.9858 51.9082 35.2777 50.6306 37.4382 49.1551C39.6152 47.6684 41.4896 45.9141 43.059 43.8925C44.6268 41.8731 45.8623 39.6542 46.7653 37.2375C47.6732 34.8074 48.125 32.1955 48.125 29.4062H48.1252L48.1248 29.3934C48.0716 27.3187 47.7523 25.3083 47.1662 23.3635C46.5758 21.4045 45.6622 19.6302 44.4256 18.0441C43.1856 16.4537 41.687 15.1842 39.9324 14.2395C38.1573 13.2836 36.1337 12.8125 33.875 12.8125V12.8124L33.8667 12.8126C32.2441 12.8396 30.722 13.151 29.3052 13.7505C27.8966 14.3464 26.6236 15.1728 25.4879 16.2274C24.3481 17.2857 23.4503 18.5095 22.7976 19.8965C22.1398 21.2943 21.8125 22.7997 21.8125 24.4062ZM65.9089 37.6471L65.7623 37.5H65.5547H51.2578H50.8974L50.7835 37.8419C50.5018 38.6869 50.1817 39.5191 49.8232 40.3387C49.4646 41.1582 49.0676 41.9652 48.6319 42.7596L48.2259 43.5H49.0703H61.5V77.5H17.5V43.5H28.5625H28.6827L28.7897 43.4454C30.0888 42.7826 31.2972 42.0392 32.4141 41.2148C33.5395 40.3841 34.5699 39.4204 35.5053 38.3246L36.2092 37.5H35.125H13.4453H13.2377L13.0911 37.6471L2.38799 48.3893L2.03572 48.7428L2.38863 49.0957L5.90426 52.6114L6.25661 52.9637L6.61016 52.6126L11.5 47.756V83V83.5H12H67H67.5V83V47.756L72.3898 52.6126L72.7434 52.9637L73.0957 52.6114L76.6114 49.0957L76.9643 48.7428L76.612 48.3893L65.9089 37.6471ZM63.6209 15.5031C62.1029 16.7515 60.7281 18.1262 59.4969 19.6272C58.2482 18.1266 56.8734 16.7518 55.3728 15.5031C56.8738 14.2719 58.2485 12.8971 59.4969 11.3791C60.7278 12.8974 62.1026 14.2722 63.6209 15.5031Z" fill="#94100C" stroke="#94100C"/>
    </Svg>
  </View>
)
