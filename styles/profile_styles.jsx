import { StyleSheet } from 'react-native';


export const profilestyles  = StyleSheet.create({

   
    card:{

        backgroundColor: '#fff',
        margin:10,
        padding:10,
        borderRadius:10,
        
    },
    

    profileInfo:{

        padding:10,
    },

    container:{
        flex:1,
        padding: 30,
        backgroundColor: '#f05f5',
       },
       
       textheader:{
        fontSize: 25,
    },
    bg:{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    modalContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background with opacity
        padding: 20,
        position: 'absolute', // Position the modal in the center of the screen
        alignSelf: 'center',
        top: '30%', // Adjust this value to control the vertical position of the modal
        width: '80%', // Adjust this value to control the width of the modal
        borderRadius: 10,
        elevation: 5, // Add elevation for a shadow effect (Android only)
      },

      header: {
        fontSize: 24,
        color: '#333',
        fontFamily: 'Roboto-Bold',
        marginBottom: 20,
      },
      button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'Roboto-Regular',
      },
      saveButton: {
        backgroundColor: '#2ecc71',
        borderColor: '#27ae60',
        borderWidth: 5,
        borderRadius:10,
      },
      deleteButton: {
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b',
        borderWidth: 5,
        borderRadius:10,
      },
      closeButton: {
        backgroundColor: '#333',
        borderColor: '#000',
        borderWidth: 5,
        borderRadius:10,
      
      },
      closeButtonText: {
        color: '#fff', // Set text color to white
      },

      buttonContainers: {
        flexDirection: 'row', // Display buttons vertically
        justifyContent: 'space-between',
        marginTop: 10,

      },

      editButton:{
        backgroundColor: '#2ecc71',
        borderColor: '#27ae60',
        borderWidth: 5,
        borderRadius:10,
        alignItems:'center',
      },
      editButtonText:{
        fontSize:15,
      },
      
});
