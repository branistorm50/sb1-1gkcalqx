export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          created_at: string
          user_id: string
          type: 'individual' | 'company'
          name: string
          contact_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          city: string | null
          postal_code: string | null
          country: string | null
          siret: string | null
          vat_number: string | null
          notes: string | null
          billing_address: string | null
          billing_city: string | null
          billing_postal_code: string | null
          billing_country: string | null
          same_address: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          type: 'individual' | 'company'
          name: string
          contact_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          siret?: string | null
          vat_number?: string | null
          notes?: string | null
          billing_address?: string | null
          billing_city?: string | null
          billing_postal_code?: string | null
          billing_country?: string | null
          same_address?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          type?: 'individual' | 'company'
          name?: string
          contact_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          siret?: string | null
          vat_number?: string | null
          notes?: string | null
          billing_address?: string | null
          billing_city?: string | null
          billing_postal_code?: string | null
          billing_country?: string | null
          same_address?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          company_name: string | null
          address: string | null
          postal_code: string | null
          city: string | null
          country: string | null
          phone: string | null
          website: string | null
          siret: string | null
          vat_number: string | null
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          iban: string | null
          bic: string | null
          quote_prefix: string
          invoice_prefix: string
          terms_and_conditions: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          company_name?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string | null
          phone?: string | null
          website?: string | null
          siret?: string | null
          vat_number?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          iban?: string | null
          bic?: string | null
          quote_prefix?: string
          invoice_prefix?: string
          terms_and_conditions?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          company_name?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string | null
          phone?: string | null
          website?: string | null
          siret?: string | null
          vat_number?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          iban?: string | null
          bic?: string | null
          quote_prefix?: string
          invoice_prefix?: string
          terms_and_conditions?: string | null
        }
      }
      quotes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          client_id: string
          number: string
          status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'invoiced'
          issue_date: string
          valid_until: string
          title: string
          notes: string | null
          global_discount: number | null
          subtotal: number
          tax_total: number
          total: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          client_id: string
          number: string
          status?: 'draft' | 'sent' | 'accepted' | 'rejected' | 'invoiced'
          issue_date: string
          valid_until: string
          title: string
          notes?: string | null
          global_discount?: number | null
          subtotal: number
          tax_total: number
          total: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          client_id?: string
          number?: string
          status?: 'draft' | 'sent' | 'accepted' | 'rejected' | 'invoiced'
          issue_date?: string
          valid_until?: string
          title?: string
          notes?: string | null
          global_discount?: number | null
          subtotal?: number
          tax_total?: number
          total?: number
        }
      }
      quote_items: {
        Row: {
          id: string
          created_at: string
          quote_id: string
          service_id: string | null
          title: string
          description: string | null
          quantity: number
          unit: string
          price: number
          discount: number | null
          tax_rate: number
          subtotal: number
          tax_amount: number
          total: number
          position: number
        }
        Insert: {
          id?: string
          created_at?: string
          quote_id: string
          service_id?: string | null
          title: string
          description?: string | null
          quantity: number
          unit: string
          price: number
          discount?: number | null
          tax_rate: number
          subtotal: number
          tax_amount: number
          total: number
          position: number
        }
        Update: {
          id?: string
          created_at?: string
          quote_id?: string
          service_id?: string | null
          title?: string
          description?: string | null
          quantity?: number
          unit?: string
          price?: number
          discount?: number | null
          tax_rate?: number
          subtotal?: number
          tax_amount?: number
          total?: number
          position?: number
        }
      }
      invoices: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          client_id: string
          quote_id: string | null
          number: string
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          issue_date: string
          due_date: string
          title: string
          notes: string | null
          global_discount: number | null
          subtotal: number
          tax_total: number
          total: number
          payment_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          client_id: string
          quote_id?: string | null
          number: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          issue_date: string
          due_date: string
          title: string
          notes?: string | null
          global_discount?: number | null
          subtotal: number
          tax_total: number
          total: number
          payment_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          client_id?: string
          quote_id?: string | null
          number?: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          issue_date?: string
          due_date?: string
          title?: string
          notes?: string | null
          global_discount?: number | null
          subtotal?: number
          tax_total?: number
          total?: number
          payment_date?: string | null
        }
      }
      invoice_items: {
        Row: {
          id: string
          created_at: string
          invoice_id: string
          service_id: string | null
          title: string
          description: string | null
          quantity: number
          unit: string
          price: number
          discount: number | null
          tax_rate: number
          subtotal: number
          tax_amount: number
          total: number
          position: number
        }
        Insert: {
          id?: string
          created_at?: string
          invoice_id: string
          service_id?: string | null
          title: string
          description?: string | null
          quantity: number
          unit: string
          price: number
          discount?: number | null
          tax_rate: number
          subtotal: number
          tax_amount: number
          total: number
          position: number
        }
        Update: {
          id?: string
          created_at?: string
          invoice_id?: string
          service_id?: string | null
          title?: string
          description?: string | null
          quantity?: number
          unit?: string
          price?: number
          discount?: number | null
          tax_rate?: number
          subtotal?: number
          tax_amount?: number
          total?: number
          position?: number
        }
      }
      trades: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          trade_id: string
          name: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          trade_id: string
          name: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          trade_id?: string
          name?: string
          description?: string | null
        }
      }
      services: {
        Row: {
          id: string
          created_at: string
          user_id: string | null
          category_id: string
          name: string
          description: string | null
          technical_details: string | null
          unit: string
          price: number
          tax_rate: number
          is_custom: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string | null
          category_id: string
          name: string
          description?: string | null
          technical_details?: string | null
          unit: string
          price: number
          tax_rate: number
          is_custom?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string | null
          category_id?: string
          name?: string
          description?: string | null
          technical_details?: string | null
          unit?: string
          price?: number
          tax_rate?: number
          is_custom?: boolean
        }
      }
      service_options: {
        Row: {
          id: string
          created_at: string
          service_id: string
          option_type: 'color' | 'material' | 'finish' | 'dimension' | 'other'
          name: string
          values: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          service_id: string
          option_type: 'color' | 'material' | 'finish' | 'dimension' | 'other'
          name: string
          values: string[]
        }
        Update: {
          id?: string
          created_at?: string
          service_id?: string
          option_type?: 'color' | 'material' | 'finish' | 'dimension' | 'other'
          name?: string
          values?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}