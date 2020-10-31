import {StyleSheet} from 'react-native';

const contactStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItems: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    height: 75,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayIcon: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  normalText: {
    marginLeft: 10,
    color: 'black',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
  errorContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorPageTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    width: '80 %',
  },
  errorPageButton: {
    color: 'steelblue',
    fontSize: 20,
    margin: 10,
  },
  errorPageTextNormal: {
    fontSize: 16,
  },
});

export default contactStyles;
