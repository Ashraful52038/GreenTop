'use client'

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk' // ✅ Added deskTool
import { visionTool } from '@sanity/vision'
import { structure } from './sanity/structure' // ✅ Ensure correct import
import { apiVersion, dataset, projectId } from './sanity/env' // ✅ Ensure correct import
import { schema } from './sanity/schemaTypes' // ✅ Ensure correct import

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({ structure }), // ✅ Correct way to use structure
    visionTool({ defaultApiVersion: apiVersion }), // ✅ Ensure correct API version
  ],
})
