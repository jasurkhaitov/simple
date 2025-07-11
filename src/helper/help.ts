export const langFunction = (lang: string) :string => {
	switch (lang) {
		case 'English':
			return 'en'
		case 'Russian':
			return 'ru'
		default:
			return 'uz'
	}
}