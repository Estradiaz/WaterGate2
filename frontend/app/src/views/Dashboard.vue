<template>
    <v-container fluid>
        <v-row>
            Mama Mia un der con stru ction
            <v-col 
                v-for="widget in widgets"
                :key="widget.key"
                v-bind="widget.attrs"
            >
                <component :is="widget.component"/>
            </v-col>
        </v-row>
    </v-container>
</template>